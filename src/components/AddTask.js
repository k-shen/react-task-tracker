import React from 'react'
import { useState } from 'react'

const AddTask = ( {onAdd} ) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [important, setImportant] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert('Task cannot be empty')
            return
        }

        onAdd({ text, day, important })

        setText('')
        setDay('')
        setImportant(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>New Task</label>
                <input type='text' 
                    placeholder='Add Task' 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Date and Time</label>
                <input type='text' 
                    placeholder='Add Date and Time' 
                    value={day} 
                    onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Important</label>
                <input type='checkbox'
                    checked={important}
                    value={important}
                    onChange={(e) => setImportant(e.currentTarget.checked)} />
            </div>

            <input type='submit' 
                value='Save Task' 
                className='btn btn-block'
             />
        </form>
    )
}

export default AddTask
