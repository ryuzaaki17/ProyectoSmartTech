import { useState,useEffect } from "react"
import "./AdvSearch.css"

export const AdvSearch = ({buscarTermino}) => {
 
    const[productos,setProductos] = useState([]);
    const[error,setError] = useState(null)
    const[orden,setOrden] = useState("Más Vendidos")
    const[filtros,setFiltros] = useState({categorias: [],tipos: []})
  

    useEffect( () => {
        const fetchProductos = async () => {
            try {
                const response = await fetch("https://68599aab9f6ef9611153ae63.mockapi.io/api/productos/articles")
                //const response = await fetch("https://fakestoreapi.com/products/category/electronics")
                if(!response.ok) {
                    throw new Error("Error al cargar los productos");

                }
                const data = await response.json();
                setProductos(data)

            } catch (error) {
                setError(error.message)
            }
        }
        fetchProductos();
    }, []);

    const toggleFiltros = (tipoFiltro,valor) => {
        setFiltros((prev) => ( {
            ...prev,
            [tipoFiltro]: prev[tipoFiltro].includes(valor)
            ? prev[tipoFiltro].filter((item) => item !== valor)
            : [...prev[tipoFiltro], valor],
        }))
    }

    const normalizarTexto = (texto) =>{
        console.log('normalizarTexto input:', texto);
        return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"")
        
    }

    const productosFiltrados = productos.filter((producto) => {
        const matchCategoria = filtros.categorias.length === 0 || 
        filtros.categorias.includes(producto.category);
        const matchTipo = filtros.tipos.length === 0 || 
        filtros.tipos.includes(producto.brand);

        const matchBuscar = !buscarTermino || normalizarTexto(producto.name).includes(normalizarTexto(buscarTermino));

        return matchCategoria && matchTipo && matchBuscar;
    })
    const handleOrdenChange = (e) => {
        setOrden(e.target.value)
    }

    const productosOrdenados = [...productosFiltrados].sort((a,b) => {
        if(orden === "Precio: Menor a Mayor"){
            return a.price_cop - b.price_cop
        } if(orden === "Precio: Mayor a Menor"){
            return b.price_cop - a.price_cop
        }
        return 0;
    })
  return (
    <section className="main-content">
        <aside className="filters">
            <h2>Filtros</h2>
            <div className="filters-category">
                <div className="filter-category">
                    <h3>Categorias</h3>
                    <label>
                        <input type="checkbox"
                        onChange ={() => toggleFiltros("categorias","Audífonos/Parlantes")}/>
                        <span>Audífonos/Parlantes</span>
                    </label>
                    <label>
                        <input type="checkbox"
                        onChange ={() => toggleFiltros("categorias","Televisores")}/>
                        <span>Televisores</span>
                    </label>
                    <label>
                        <input type="checkbox"
                        onChange ={() => toggleFiltros("categorias","Accesorios")}/>
                        <span>Accesorios</span>
                    </label>
                     <label>
                        <input type="checkbox"
                        onChange ={() => toggleFiltros("categorias","Relojes")}/>
                        <span>Relojes</span>
                    </label>
                     <label>
                        <input type="checkbox"
                        onChange ={() => toggleFiltros("categorias","Computadores")}/>
                        <span>Computadores</span>
                    </label>
                     <label>
                        <input type="checkbox"
                        onChange ={() => toggleFiltros("categorias","Cámaras")}/>
                        <span>Cámaras</span>
                    </label>
                </div>

                <div className="filter-category">
                    <h3>Marcas</h3>
                    <label>
                        <input type="checkbox"
                        onChange ={() => toggleFiltros("tipos","Apple")}/>
                        <span>Apple</span>
                    </label>
                    <label>
                        <input type="checkbox"
                        onChange ={() => toggleFiltros("tipos","Samsung")}/>
                        <span>Samsung</span>
                    </label>
                    <label>
                        <input type="checkbox"
                        onChange ={() => toggleFiltros("tipos","Sony")}/>
                        <span>Sony</span>
                    </label>
                    <label>
                        <input type="checkbox"
                        onChange ={() => toggleFiltros("tipos","Anker")}/>
                        <span>Anker</span>
                    </label>
                    <label>
                        <input type="checkbox"
                        onChange ={() => toggleFiltros("tipos","Amazon")}/>
                        <span>Amazon</span>
                    </label>
                    <label>
                        <input type="checkbox"
                        onChange ={() => toggleFiltros("tipos","Xiaomi")}/>
                        <span>Xiaomi</span>
                    </label>
                    <label>
                        <input type="checkbox"
                        onChange ={() => toggleFiltros("tipos","HP")}/>
                        <span>HP</span>
                    </label>
                </div>

                <div className="filter-category">
                    <h3>Rango de precios</h3>
                    <label>
                        <input type="checkbox"/>
                        <span>Menos de $100.000</span>
                    </label>
                    <label>
                        <input type="checkbox"/>
                        <span>$100.000 a $500.000</span>
                    </label>
                    <label>
                        <input type="checkbox"/>
                        <span>Más de $500.000</span>
                    </label>
                </div>
            </div>

        </aside>
        <main className="collections">
            <div className="options">
                <h2>TODOS LOS PRODUCTOS</h2>
                <div className="sort-options">
                    <label>
                        Ordenar por:
                        <select onChange={handleOrdenChange} value ={orden}>
                            <option>Más Vendidos</option>
                            <option>Precio: Menor a Mayor</option>
                            <option>Precio: Mayor a Menor</option>
                        </select>
                    </label>
                </div>
            </div>

            <div className="products">
                { error ? (
                    <p className = "error-message">{error}</p>
                ): productosFiltrados.length > 0 ? (
                    productosOrdenados.map((producto) => (
                        <div className="product-card" key={producto.id}>
                            <img src={producto.images} 
                            alt={producto.name}
                            className="product-image"/>

                            <h3>{producto.name}</h3>
                            <p>{producto.price_cop}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-results">
                        No hay productos que coincidan con los filtros de busqueda
                    </p>
                )

                }
            </div>
        </main>

    </section>
  )
}

export default AdvSearch