const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard =document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()  //creamos objeto DocumentFragment vacio, el cual queda listo para que pueda insertarseles nodos en el
let carrito ={}

document.addEventListener('DOMContentLoaded',()=> {
    fetchData()
    if(localStorage.getItem('carrito')){  //si el carrito no esta vacio
        carrito = JSON.parse(localStorage.getItem('carrito')) 
        crearCarrito() // lo recupero y lo creo
    }
})
cards.addEventListener('click', e =>{
    addCarrito(e)
})

items.addEventListener('click', e =>{
    btnAccion(e)
})
const fetchData = async () =>{
    try{
        const res = await fetch('../js/api.json')
        const data = await res.json()
       
        console.log(data)
        pintarCards(data)
    } catch (error){
        //console.log(error)
    }
}

const pintarCards = data =>{
    
  data.forEach(prod => {
        
      templateCard.querySelector('h5').textContent = prod.title
      templateCard.querySelector('p').textContent = prod.precio 

      templateCard.querySelector('img').setAttribute("src",prod.thumbnailUrl)
      templateCard.querySelector('.buttonComprar').dataset.id = prod.id
      const clone = templateCard.cloneNode(true)
      fragment.appendChild(clone)
  });
  cards.appendChild(fragment)
}

// agrego el elemento seleccionado y se lo envio a setCarrito
const addCarrito = e =>{
    if(e.target.classList.contains('buttonComprar')){
        setCarrito(e.target.parentElement) //agarra todo el card desde el botonComprar
    }
    e.stopPropagation()
}

const setCarrito = objeto =>{
    const producto = {
        id: objeto.querySelector('.buttonComprar').dataset.id,
        title : objeto.querySelector('h5').textContent,
        precio : objeto.querySelector('p').textContent,
        cantidad : 1
    }
    if(carrito.hasOwnProperty(producto.id)){ //si ya esta el producto, lo aumento
        producto.cantidad = carrito[producto.id].cantidad +1
    }
    carrito[producto.id]= {...producto} // adquiere la informacion y hace una copia del producto
    crearCarrito()

    localStorage.setItem('carrito',JSON.stringify(carrito)) // para que al recargar la pagina se mantenga nuestro carrito
}

const crearCarrito =() =>{
    items.innerHTML = '' // lo ponemos vacio para no reescribir la informacion
    Object.values(carrito).forEach(producto =>{ //el Object.values devuelve un array del objeto seleccionado, por lo cual podemos usar un forEach para iterarlo
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title // el querySelectorAll selecciona a partir del indice que le indiques entre []
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad   
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id 
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id 
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio // el total de la compra
        const clone = templateCarrito.cloneNode(true) //clonamos el templateCarrito a la variable clone
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    crearFooter()
}

const crearFooter = () =>{
    footer.innerHTML= '' // lo ponemos vacio para no reescribir la informacion
    if(Object.keys(carrito).length === 0){ //el Object.keys(carrito) nos retorna un array con lo que hay adentro del carrito, al aplicar el length sabemos si el carrito estaba vacio o no
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar! :)</th>
        `
        return
    }
    const nCantidad = Object.values(carrito).reduce((acc,{cantidad})=>  acc + cantidad, 0) //guardamos en nCantidad la acumulacion de los productos
    const nPrecio = Object.values(carrito).reduce((acc,{cantidad, precio})=> acc + cantidad * precio,0) //guardamos en nPrecio el precio total de la compra


    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', ()=>{
        carrito = {}
        crearCarrito()
    })
}
const btnAccion = e =>{
    //si queremos aumentar
    if(e.target.classList.contains('btn-info')){

        
        const producto = carrito[e.target.dataset.id]
        producto.cantidad ++ // tenemos un objeto producto, accedemos a su cantidad y le agregamos 1
        carrito[e.target.dataset.id] = {...producto}
        crearCarrito()
    }

    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0){
            delete  carrito[e.target.dataset.id]
        }
        crearCarrito()
    }

    e.stopPropagation() // evitamos la propagacion adicional de nuestro evento
}



class producto{
    constructor(id,tipo,precio){
        this.id=id;
        this.tipo=tipo;
        this.precio=precio;
    }
    setdato(propiedad,dato){
        this[propiedad] = dato
    }
    getdato(propiedad){
        return this[propiedad]
    }

    sumaEnvio(distancia){

        if(distancia>=1000){
            this.precio= this.precio + 250
        }else if(distancia>=500){
            this.precio= this.precio + 150
        }else if(distancia>=200){
            this.precio= this.precio + 50
        }else{
            this.precio= this.precio
        }
    }
    

}



const suculentas = []
suculentas.push(new producto(1,"Gasteria",530))
suculentas.push(new producto(2,"Dudleya",435))
suculentas.push(new producto(3,"Aeonuim",380))
suculentas.push(new producto(4,"Echeverria",400))
suculentas.push(new producto(5,"Kalanchoe",420))
suculentas.push(new producto(6,"Stapelia",450))







   
// const abrirCarrito = document.getElementById("carrito");
// const cerrarCarrito = document.getElementById("modal-cerrar")
// const modalContainer = document.getElementById("modal-container-carrito")

// abrirCarrito.addEventListener('click', ()=>{
//     modalContainer.classList.add('modal-active')
// })
// cerrarCarrito.addEventListener('click', ()=>{
//     modalContainer.classList.remove('modal-active')
// })

// const modalContent = document.getElementById("modal-content-carrito")
// console.log(modalContent)

$('#carrito').click(function(){
    $('#modal-container-carrito').css({"opacity": "1", "visibility": "visible","display":"flex"})
    $('#modal-carrito').css({"opacity": "1", "visibility": "visible"})
})
$('#modal-cerrar').click(function(){
    $('#modal-container-carrito').css({"opacity": "0", "visibility": "none", "display":"none"})
    $('#modal-carrito').css({"opacity": "0", "visibility": "none"})
    
})

$()



    

let botonComprar = document.getElementsByClassName("buttonComprar");

for(let j = 0; j<botonComprar.length; j++ ){
    botonComprar[j].onclick = () =>{modalContent.innerHTML = `
    <h5> Usted compro </h5>
    ${suculentas[j].tipo} que tiene un precio de ${suculentas[j].precio}
`}

}




// const cards=document.getElementById('cards')
// const templateCard = document.getElementById('template-card').content
// let id=1
// $('#buttonBuscar').on('click', ()=>{
//     $.get(`https://jsonplaceholder.typicode.com/posts/${id}`, (res) =>{
//         console.log(res)
//         $('.nombreBuscado').html(`
//             <h1>${res.title}</h1>
        
//         `)

//     })
//     id++
// })



