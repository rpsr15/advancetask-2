import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Grid, Card, List, Pagination } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import TalentCardDetail from './TalentCardDetail.jsx';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

class TalentList extends React.Component {
    componentDidUpdate(props) {
        ReactDOM.findDOMNode(this).scrollTop = 0;
        //window.scrollTo(0,0)
    }
    render() {
        return (
            <div style={{ height: (this.props.height * 0.8), 'overflowY': 'scroll', 'overflowX': 'hidden', }}>


                <List style={{ height: '100%', padding: '1rem', textAlign: 'center' }}>

                    {this.props.feedData.map((feed) => {

                        return (<List.Item style={{ textAlign: 'center' }} key={feed.id}>

                            <TalentCard style={{ margin: 'auto' }} profileData={feed} />
                        </List.Item>);
                    })}
                </List>
            </div>
        );
    }
}


export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")
        loader.isLoading = true

        this.state = {
            isLoading: true,
            count: 0,
            width: 0, height: 0,
            loadNumber: 5,
            activePage: 1,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: null
        }

        this.init = this.init.bind(this);
        this.loadData = this.loadData.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handlePaginationChange = this.handlePaginationChange.bind(this)

    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
    }

    componentDidUpdate(props) {

        window.scrollTo(0, 0)
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        //window.addEventListener('scroll', this.handleScroll);
        this.init()
        this.loadData();

    };

    loadData() {

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talent-services-profile.azurewebsites.net/profile/profile/getTalentList?pageNumber=' + this.state.activePage + '&pageSize=' + this.state.loadNumber,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                this.setState({
                    count: (Math.ceil(res.count / this.state.loadNumber)),
                    feedData: res.data,
                    isLoading: false
                })
            }.bind(this),
            error: function (res) {



            }.bind(this),
        });


    }

    handlePaginationChange(e, { activePage }) {

        this.setState({ activePage, isLoading: true }, () => {
            this.loadData()
        })
    }


    render() {

        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData} style={{ textAlign: 'center', height: this.state.height }}>
                <Grid columns={3} style={{ paddingLeft: '5rem', paddingRight: '5rem', paddingBottom: '2rem', height: '100%' }}>
                    <Grid.Column width={4}>

                        <CompanyProfile />
                    </Grid.Column>

                    <Grid.Column width={8} style={{ textAlign: 'center' }}  >





                        {
                            (this.state.isLoading) ? <Loader
                                type="ThreeDots"
                                color="#808080"
                                height={100}
                                width={100}
                                isLoading={true}

                            /> : <TalentList feedData={this.state.feedData} height={this.state.height} />
                        }


                        <Pagination
                            boundaryRange={0}
                            activePage={this.state.activePage}
                            onPageChange={this.handlePaginationChange}
                            siblingRange={1}
                            totalPages={this.state.count}
                        />


                    </Grid.Column>

                    <Grid.Column width={4}>


                        <FollowingSuggestion />

                    </Grid.Column>

                </Grid>

            </BodyWrapper>
        )
    }
}