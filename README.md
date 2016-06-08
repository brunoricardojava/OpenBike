# OpenBike

"Descrição mais geral do que significa o projeto OpenBike"

## OpenBike-UFPA
Sendo a UFPA campus Belem um dos maiores campus universitario da região norte e do Brasil, com aproximadamente 450 mil metros quadrados e com fluxo diario de 45 mil pessoas, faz se necessario um sistema de locomoção interno para dicentes, docentes e comunidade.

O projeto OpenBike-UFPA, vem como a iniciativa de disponibilizar de forma gratuita e ecologica um sistema de compartilhamento de bicicletas, que atenda as necessidades de locomoção dentro da cidade universitaria do guamá.

## Descrição do funcionamento
### Cadastro:
> Esse sistema é responssavel pelo cadastro de usuários na rede de compartilhamento de bicicletas. Para isso precisamos de algumas informações obrigatorias como CPF(Comprovente de Pessoa Fisica), nome completo, endereço, número de telefone, e-mail, login e senha.
Podemos ter acesso a diversar plataformas de cadastro, sendo opcional a implementação delas, como: mobile, browser e na própria estação da bicicleta.
As estações do OpenBike vão funcionar conectadas na mesma rede, podendo ser pela internet, rede local da UFPA ou uma rede própria do projeto, com isso vamos usar um unico banco de dados onde vamos verificar se o usuário esta cadastrado.

### Emprestimo
> O usuário devidamente cadastrado, pode ir em uma estação do OpenBike e se autenticar para o sistema, usando quaisquer meios de autenticação como: login e senha, biometria, RFID... Previamente cadastrados. Com a autenticação confirmada o usuário pode fazer o emprestimo da bicicleta que estja disponivel na estação. 

### Devolução
> A devolução deve obdecer as normas préveamente estabelcidas como tempo de uso e cuidados com a bicicleta. Recebendo multas no atraso da devolução, danos na bicicletas, roubo...

## Pontos de instalção das estações(1° Etapa)
- Portão III;
- RU(Básico)
- Biblioteca central;
- PCT-GUAMÁ

## Etapas do projeto
- [X] Começo do projeto, definição de prazos e criação da pagina no github.
- [ ] Elaboração de um big picture do projeto, analisando impactos sociais e viabilidades de implementação. 
- [ ] Criação de um protótipo do projeto, instalação no PCT-GUAMÁ. Testes de funcionalidade.
- [ ] Arecadação de fundos(Campanhas abertas de arecadação, investimentos publicos...), primeira tentativa de implementação (projeto piloto).
- [ ] Melhorias no sistema, sendo essas segurança, funcionalidades de comunicação por rádio das bicicletas com as estações, aplicação em IoT.
- [ ] Expansão do sistema para a cidade de Belém(PA).

## Hardware

## Software

##Referências

- [Portal UFPA](https://www.portal.ufpa.br/)

- [UFPA em números](https://www.portal.ufpa.br/imprensa/noticia.php?cod=6449)

- [Cidade Universitaria-UFPA](https://books.google.com.br/books?id=KdNVBQAAQBAJ&pg=PA37&lpg=PA37&dq=Cidade+Universit%C3%A1ria+Professor+Jos%C3%A9+da+Silveira+Netto+-+Bel%C3%A9m&source=bl&ots=RJmgXofZuI&sig=bD5YVcfZGfq5Q06MRKB1nAzs6sk&hl=pt-BR&sa=X&ved=0ahUKEwjvz66rzZjNAhUHOCYKHaGAAH0Q6AEIUTAJ#v=onepage&q=Cidade%20Universit%C3%A1ria%20Professor%20Jos%C3%A9%20da%20Silveira%20Netto%20-%20Bel%C3%A9m&f=false)
