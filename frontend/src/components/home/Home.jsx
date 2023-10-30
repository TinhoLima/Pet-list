import React from "react";
import Main from "../template/Main"

export default props =>
    <Main icon="home" title="Home" subtitle="Pet List fazendo a diferença.">
        <div className="display-3">Bem-vindo!</div>
        <hr />
        <h1>Seu <strong><span className="text-danger">Pet</span></strong> é especial e não temos dúvida disso!</h1>
        <p>Por isso desenvolvemos um banco de dados que reuni informações do seu pet, vinculada às informações de seu tutor. Este conteúdo, estará diretamente ligado ao número do microchip. Com o cadastro efetuado, todo registro do proprietário e de seu pet, permanecerão resguardados em nosso em nosso banco de dados. Em caso de perda do animal e após a sua localização, com o número do microchip é possível realizar uma busca em nosso site. Obtendo assim, os dados de contato do proprietário. <br/><br/> Em breve, acrescentaremos novas ferramentas e faremos o possível para atender com o melhor serviço para você e o seu Pet.</p>
    </Main>