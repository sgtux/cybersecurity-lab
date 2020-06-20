import React, { useState } from 'react'

import { simulationService } from '../../services'

export function Simulation() {

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [plots, setPlost] = useState('')

  function simulate() {
    simulationService.create({ description, amount: parseFloat(amount), plots: parseInt(plots) })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <div>
      <h3 className="page-title">Simule seu financiamento.</h3>

      <form className="form-simulation">

        <span>Descrição da produto:</span>
        <input className="form-input" onChange={e => setDescription(e.target.value)} />
        <span asp-validation-for="Description" className="validation-error"></span>

        <span>Valor total:</span>
        <input className="form-input" onChange={e => setAmount(e.target.value)} />
        <span asp-validation-for="Amount" className="validation-error"></span>

        <span>Quantidade de parcelas:</span>
        <input class="form-input" onChange={e => setPlost(e.target.value)} />
        <span asp-validation-for="Plots" className="validation-error"></span>

        <div style={{ textAlign: 'center' }}>
          <button type="button" onClick={() => simulate()} className="btn btn-simulation">Simular</button>
          <div style={{ marginTop: '5px', fontSize: '12px' }} >
            <a href="/Simulation/List">Ver Simulações</a>
          </div>
        </div>
      </form>
    </div>
  )
}