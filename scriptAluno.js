class cadastroAluno {
    constructor(nome, email, senha) {
        this.nome = nome;
        this.senha = senha;
        this.email = email;
    }
    //get
    getNome() {
        return this.nome;
    }
    getSenha() {
        return this.senha;
    }
    getEmail() {
        return this.email;
    }
    //set
    setNome(novoNome) {
        this.nome = novoNome;
    }
    setSenha(novaSenha) {
        this.senha = novaSenha;
    }
    setEmail(novoEmail) {
        this.email = novoEmail;
    }
    toJson(){
        return JSON.stringify(this);
    }
    static fromJson(dadosJson){
        const dados=JSON.parse(dadosJson);
        return new cadastroAluno(dados.nome,dados.email,dados.senha);
    }
}

const formulario= document.getElementById('form')
const nome = document.getElementById('username');
const email = document.getElementById('email');
const senha = document.getElementById('password');

formulario.addEventListener('submit', (e) =>{
    e.preventDefault()
    checkInputs();
})

function checkInputs() {

const nomeValue = username.value;
const cpfValue = cpf.value;
const emailValue = email.value;
const senhaValue = password.value;


let aluno = new cadastroAluno(nomeValue, emailValue, senhaValue);
const listaCadastroAluno= JSON.parse(localStorage.getItem('listaCadastroAluno')||'[]');
let alunoJSON=aluno.toJson();
let novoAluno= cadastroAluno.fromJson(alunoJSON);
listaCadastroAluno.push(novoAluno);
localStorage.setItem('listaCadastroAluno', JSON.stringify(listaCadastroAluno));


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
    if (senhaValue === "") {
        setErrorFor(password, "A senha é obrigatória.");
      } else if (senhaValue.length < 6) {
        setErrorFor(password, "A senha precisa ter no mínimo 8 caracteres.");
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
function setSucessoFor(input){
    const formcontrol=input.parentElement; //vai retorna a div que é pai do input

    formcontrol.className='form-control sucess';
}


function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
}



