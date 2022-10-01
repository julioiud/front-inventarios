import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { obtenerTiposEquipos } from '../../services/TipoEquipoService'
import Modal from '../ui/Modal'

export default function TipoEquipos() {

  const [tipoEquipos, setTipoEquipos] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)

  const listTipoEquipos = async () => {
    setLoading(true)
    try{
      setError(false)
      const { data } = await obtenerTiposEquipos(query)
      setTipoEquipos(data)
      setLoading(false)
    }catch(e){
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    listTipoEquipos();
  }, [query])

  const cambiarSwitche = () => {
    setQuery(!query)
  }

  return (
      <div>
      <Modal titulo={'Tipo de Equipo'}/>
      <button 
        type="button" 
        className="btn btn-primary" 
        data-bs-toggle="modal" 
        data-bs-target="#exampleModal" 
      >
        Nuevo
      </button>
      <div className="form-check form-switch">
        <input 
          className="form-check-input" 
          type="checkbox" 
          role="switch" 
          id="flexSwitchCheckChecked" 
          checked={query}
          onChange={cambiarSwitche}
        />
        <label className="form-check-label" hmtlFor="flexSwitchCheckChecked">( Inactivo / Activo )</label>
      </div>
      {
        loading && 
        (<div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        </div>)
      }
      {
      error && (
      <div className="alert alert-danger" role="alert">
        Error al cargar datos
        </div>)
      }
      <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Estado</th>
          <th scope="col">Creado</th>
          <th scope="col">Actualizado</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {
          tipoEquipos.map((tipoEquipo,index) => {
            return (
              <tr>
              <th scope="row">{index + 1}</th>
              <td>{tipoEquipo.nombre}</td>
              <td>{tipoEquipo.estado ? 'Activo': 'Inactivo'}</td>
              <td>{dayjs(tipoEquipo.fechaCreacion).format('YYYY-MM-DD')}</td>
              <td>{dayjs(tipoEquipo.fechaActualizacion).format('YYYY-MM-DD')}</td>
              <td>
                <button type="button" className="btn btn-success">Editar</button>
                <button type="button" className="btn btn-danger">Borrar</button>
              </td>
            </tr>
            )
          })
        }
      </tbody>
      </table>
    </div>
  )
}
