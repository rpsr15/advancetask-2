import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,

        }

        this.loadData = this.loadData.bind(this)
        this.displayCard = this.displayCard.bind(this)
        this.getSkillsString = this.getSkillsString.bind(this)
        this.loadData()
    }

    loadData() {

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talent-services-profile.azurewebsites.net/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                this.setState({
                    companyDetails: res.employer,
                    isLoading: false
                })
            }.bind(this),
            error: function (res) {



            }.bind(this),
        })
    }
    getSkillsString()
    {
        if(this.state.companyDetails.skills.length > 0 )
        {
            this.state.companyDetails.skills.reduce((a,b) => { a+","+b})
            return result

        }else{
            return "We currently do not have a specific skills that we desire."
        }
    }

    displayCard() {
        return (<Card style={{ textAlign: 'center', padding: '0.7rem' }}
        >

            <Card.Header style={{ textAlign: 'center',overflowWrap: 'break-word' }}>
                <Image style={{ margin: 'auto' }} src={this.state.companyDetails.profilePhoto||'https://react.semantic-ui.com/images/wireframe/image.png' } 
                 size='mini' circular />
                {this.state.companyDetails.companyContact.name}
            </Card.Header>
            <Card.Meta>
                <Icon name='marker'></Icon>{this.state.companyDetails.companyContact.location.city || '' + (this.state.companyDetails.companyContact.location.city ? "," : '') + (this.state.companyDetails.companyContact.location.country || '')}
            </Card.Meta>
            <Card.Description style={{ paddingTop: '0.50rem' }}>
                {
                    this.getSkillsString()
                }
                
            </Card.Description>
            <Card.Content extra style={{ textAlign:'left',overflowWrap: 'break-word'}}>
                <div>
                    <span>
                        <Icon name='call'></Icon>
                        {':' + (this.state.companyDetails.companyContact.phone || '')}
                    </span>
                </div>
                <div>
                    <span>
                        <Icon name='mail'></Icon>
                        {':' + (this.state.companyDetails.companyContact.email || '')}
                    </span>
                </div>
            </Card.Content>
        </Card>)
    }
    render() {


        return (
            this.state.isLoading ?
                <Card style={{ textAlign: 'center', padding: '0.7rem' }}>
                    <Loader
                        type="ThreeDots"
                        color="#808080"
                        height={50}
                        width={50}
                        isLoading={true}

                    /> </Card> : this.displayCard()
        );
    }
}