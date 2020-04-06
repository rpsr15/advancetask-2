import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Card, Icon, Embed, Image } from 'semantic-ui-react';


const SkillIcon = (props) => {
    return (<div style={{ marginRight: '0.rem', padding: '0.5rem', display: 'inline-block', color: 'dodgerblue', borderRadius: '4px', textAlign: 'center', border: '1px solid dodgerblue' }}>{props.name}</div>)
}
export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultView: true
        }
        this.displayDefaultCard = this.displayDefaultCard.bind(this)
        this.displayProfileIcon = this.displayProfileIcon.bind(this)
        this.openLink = this.openLink.bind(this)

    };

    openLink(link) {
        if (!link.match(/^https?:\/\//i)) {
            link = 'http://' + link;
        }
        if (link)
            window.open(link, "_blank")
    }

    displayDefaultCard() {
        return (<Card style={{ width: "90%",overflowWrap: 'break-word' }}>
            <Card.Header style={{ padding: '0.7rem',overflowWrap: 'break-word' }}>
                <div style={{ display: 'inline', float: 'left' }}>
                    {this.props.profileData.name}
                </div>
                <div style={{ display: 'inline', float: 'right' }}>
                    <Icon name='star' />
                </div>
            </Card.Header>
            <Card.Content style={{ padding: '0' }}>
                <Embed />
            </Card.Content>

            <Card.Content>
                <Icon name='user' style={{ width: "20%" }} onClick={() => {
                    this.setState({
                        defaultView: false
                    })
                }} />
                <Icon name='file pdf' style={{ width: "20%" }} />
                <Icon name='linkedin' style={{ width: "20%" }} onClick={() => { this.openLink(this.props.profileData.linkedAccounts.linkedIn) }} />
                <Icon name='github' style={{ width: "20%" }} onClick={() => { this.openLink(this.props.profileData.linkedAccounts.github) }} />
            </Card.Content>

            <Card.Content style={{ textAlign: 'left' }}>
                {
                    this.props.profileData.skills.length > 0 ?
                        this.props.profileData.skills.map(
                            (skill,index) =>
                                <SkillIcon key={index}  style={{ marginRight: '0.5rem' }} name={skill} />
                        )
                        :
                        null
                }
            </Card.Content>
        </Card>)
    }
    displayProfileIcon() {
        return (<Card style={{ width: "90%" ,overflowWrap: 'break-word'}}>
            <Card.Header style={{ padding: '0.7rem' }}>
                <div style={{ display: 'inline', float: 'left' }}>
                    {this.props.profileData.name}
                </div>
                <div style={{ display: 'inline', float: 'right' }}>
                    <Icon name='star' />
                </div>
            </Card.Header>
            <Card.Content style={{ padding: "0!important", display: 'flex' }}>
                <div style={{ flex: '50%', margin: "0" }}>
                    <img style={{ width: '100%', height: '19rem' }} src={(this.props.profileData.photoId) ? this.props.profileData.photoId : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'} />
                </div>

                <div style={{ flex: '50%', textAlign: 'left', padding: '1rem' }}>
                    <h4 >Talent Snapshot</h4>
                    <h4 style={{ marginBottom: '0.1rem' }}>Current Employer</h4>
                    <div>{
                        this.props.profileData.currentEmployment || ''}</div>
                    <h4 style={{ marginBottom: '0.1rem' }}>Visa Status</h4>
                    <div>{this.props.profileData.visa || ''}</div>
                    <h4 style={{ marginBottom: '0.1rem' }}>Position</h4>
                    <div>{
                        this.props.profileData.position}</div>

                </div>

            </Card.Content>

            <Card.Content>
                <Icon name='video' style={{ width: "20%" }} onClick={() => { this.setState({ defaultView: true }) }} />
                <Icon name='file pdf' style={{ width: "20%" }} />
                <Icon name='linkedin' style={{ width: "20%" }} />
                <Icon name='github' style={{ width: "20%" }} />
            </Card.Content>

            <Card.Content style={{ textAlign: 'left' }}>
                {
                    this.props.profileData.skills.length > 0 ?
                        this.props.profileData.skills.map(
                            (skill, index) =>
                                <SkillIcon key={index} style={{ marginRight: '0.5rem' }} name={skill} />
                        )
                        :
                        null
                }
            </Card.Content>
        </Card>)
    }

    render() {
        return (this.state.defaultView) ? this.displayDefaultCard() : this.displayProfileIcon();

    }
}

