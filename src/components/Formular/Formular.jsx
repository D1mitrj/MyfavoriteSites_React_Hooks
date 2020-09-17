/* eslint-disable max-len */
import React from 'react';
import { Accordion, Input, Button, TextArea } from 'chayns-components';
import './formular.css';

class Formular extends React.Component {
    constructor() {
        super();
        this.state = {
            Name: '',
            EMail: '',
            Adress: '',
            Commentarie: '',
            LinkoftheSite: '',
            logIn: '',
        };
        // binding methods here.
        this.send = this.send.bind(this);
    }

    componentDidMount() {
        if (!chayns.env.user.isAuthenticated) {
            this.setState({ logIn: '(melde dich bitte an.)' });
        }
    }

    send() {
        const { Name, EMail, Adress, Commentarie, LinkoftheSite } = this.state;

        // the user needs to log in first, then they can send a formular
        if (!chayns.env.user.isAuthenticated) {
            chayns.login();
        } else {
            this.setState({ logIn: '' });
            const name = Name;
            const email = EMail;
            const adress = Adress;
            const commentarie = Commentarie;
            const linkoftheSite = LinkoftheSite;


            chayns.intercom.sendMessageToPage({
                text: `Name: ${name} E-Mail: ${email} Adresse: ${adress} Kommentar: ${commentarie} Link der Seite: ${linkoftheSite}`,
            }).then((data) => {
                if (data.status === 200) chayns.dialog.alert('', 'Danke für deinen Kommentar.');
            });
        }
    }

    render() {
        const { Name, EMail, Adress, Commentarie, LinkoftheSite, logIn } = this.state;
        return (
            <Accordion head={`Formular ${logIn}`}>
                <div className="accordion__content">
                    <p>
                        Du willst Deine Lieblingsseite hier sehen? Dann fühl das Formular
                        hier aus und schreib einen Kommentar wieso Deine Lieblingsseite
                        hier aufgeführt werden sollte.
                    </p>
                    <div className="input-group textInp">
                        <Input required className="input name" placeholder="Name" value={Name} onChange={(value) => this.setState({ Name: value })}/>
                        <Input required className="input e_mail" placeholder="E-Mail" value={EMail} onChange={(value) => this.setState({ EMail: value })}/>
                        {/* eslint-disable-next-line max-len */}
                        <Input className="input adresse" placeholder="Adresse (optional)" value={Adress} onChange={(value) => this.setState({ Adress: value })}/>
                        {/* eslint-disable-next-line max-len */}
                        <TextArea className="input kommentar" placeholder="Kommentar" autogrow value={Commentarie} onChange={(value) => this.setState({ Commentarie: value })}/>
                        {/* eslint-disable-next-line max-len */}
                        <Input className="input link_der_seite" placeholder="Link der Seite" value={LinkoftheSite} onChange={(value) => this.setState({ LinkoftheSite: value })}/>
                    </div>
                    <Button className="btn" onClick={this.send}>Absenden</Button>
                </div>
            </Accordion>
        );
    }
}

export default Formular;
