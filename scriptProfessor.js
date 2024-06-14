class cadastroProfessor{
    constructor(nome, email, senha){
        this.nome=nome;
        this.senha=senha;
        this.email=email;
    }
    //get
    getNome(){
        return this.nome;
    }
    getSenha(){
        return this.senha;
    }
    getEmail(){
        return this.email;
    }
    //set
    setNome(){
        this.nome=novoNome;
    }
    setSenha(){
        this.senha=novaSenha;
    }
    setEmail(){
        this.email=novoEmail;
    }
    toJson(){
        return JSON.stringify(this);
    }
    static fromJson(dadosJson){
        const dados=JSON.parse(dadosJson);
        return new cadastroProfessor(dados.nome,dados.email,dados.senha);
    }
}

const formulario= document.getElementById('form-control')
const nome = document.getElementById('username');
const email = document.getElementById('email');
const senha = document.getElementById('password');


function checkInputs() {
const nomeValue = username.value;
const emailValue = email.value;
const senhaValue = password.value;

let professor = new cadastroProfessor(nomeValue, cpfValue, datanascimentoValue, turmaValue, telefoneValue, emailValue, senhaValue);
const listaCadastroProfessor=JSON.parse(localStorage.getItem('listaCadastroProfessor')||'[]');
let professorJSON=professor.toJson();
let novoProfessor= cadastroProfessor.fromJson(professorJSON);
listaCadastroProfessor.push(novoProfessor);
localStorage.setItem('listaCadastroProfessor', JSON.stringify(listaCadastroProfessor));


    if (nomeValue == '') {
        setErrorFor(nome, "O nome completo é obrigatório")
    }
    else {
        setSucessoFor(nome)
    }
    //email
    if (emailValue == '') {
        setErrorFor(email, "O email completo é obrigatório")
    }
    else if (!checkEmail(emailValue)){
        setErrorFor(email, "Por favor, insira um email válido.");
    }
    else {
        setSucessoFor(email)
    }
    //senha
    if (passwordValue === "") {
        setErrorFor(password, "A senha é obrigatória.");
      } else if (passwordValue.length < 6) {
        setErrorFor(password, "A senha precisa ter no mínimo 7 caracteres.");
      } else {
        setSucessoFor(password);
      }

      const formControle= formulario.querySelectorAll('.form-control');

      const formIsValid= [... formControle].every(formControle=>{
        return (formControle.className==='campo sucess');
      })

      if (formIsValid){
        console.log("O formulário está válido!");
      }
}
function setErrorFor(input, mensagem){
    const formcontrol=input.parentElement; //vai retorna a div que é pai do input // form-control é a class da div
    const small= formcontrol.querySelector('small');

    small.innerText= mensagem;

    formcontrol.className='form-control error';
}
function setSucessoFor(){
    const formcontrol=input.parentElement; //vai retorna a div que é pai do input

    formcontrol.className='form-control sucess';
}


function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
}
