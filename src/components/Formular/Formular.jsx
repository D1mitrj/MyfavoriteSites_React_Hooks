/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Accordion, Input, Button, TextArea } from 'chayns-components';
import './formular.css';

const Formular = () => {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Adress, setAdress] = useState('');
    const [Commentarie, setCommentarie] = useState('');
    const [LinkoftheSite, setLinkoftheSite] = useState('');
    const [logIn, setLogIn] = useState('');

    useEffect(() => {
        if (!chayns.env.user.isAuthenticated) {
            setLogIn('(melde dich bitte an.)');
        }
    }, []);

    const send = () => {
        // the user needs to log in first, then they can send a formular
        if (!chayns.env.user.isAuthenticated) {
            chayns.login();
        } else {
            setLogIn('');
            const name = Name;
            const email = Email;
            const adress = Adress;
            const commentarie = Commentarie;
            const linkoftheSite = LinkoftheSite;


            chayns.intercom.sendMessageToPage({
                text: `Name: ${name} E-Mail: ${email} Adresse: ${adress} Kommentar: ${commentarie} Link der Seite: ${linkoftheSite}`,
            })
                .then((data) => {
                    if (data.status === 200) chayns.dialog.alert('', 'Danke für deinen Kommentar.');
                });
        }
    };

    return (
        <Accordion head={`Formular ${logIn}`}>
            <div className="accordion__content">
                <p>
                    Du willst Deine Lieblingsseite hier sehen? Dann fühl das Formular
                    hier aus und schreib einen Kommentar wieso Deine Lieblingsseite
                    hier aufgeführt werden sollte.
                </p>
                <div className="input-group textInp">
                    <Input
                        required
                        className="input name"
                        placeholder="Name"
                        value={Name}
                        onChange={(value) => setName(value)}
                    />
                    <Input
                        required
                        className="input e_mail"
                        placeholder="E-Mail"
                        value={Email}
                        onChange={(value) => setEmail(value)}
                    />
                    {/* eslint-disable-next-line max-len */}
                    <Input
                        className="input adresse"
                        placeholder="Adresse (optional)"
                        value={Adress}
                        onChange={(value) => setAdress(value)}
                    />
                    {/* eslint-disable-next-line max-len */}
                    <TextArea
                        className="input kommentar"
                        placeholder="Kommentar"
                        autogrow
                        value={Commentarie}
                        onChange={(value) => setCommentarie(value)}
                    />
                    <Input
                        className="input link_der_seite"
                        placeholder="Link der Seite"
                        value={LinkoftheSite}
                        onChange={(value) => setLinkoftheSite(value)}
                    />
                </div>
                <Button
                    className="btn"
                    onClick={send}
                >
                    Absenden
                </Button>
            </div>
        </Accordion>
    );
};

export default Formular;
