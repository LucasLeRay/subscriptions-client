import { useState } from 'react'

function useForm(initialState) {
  const [fields, setValues] = useState(initialState)

  return [
    fields,
    event => {
      setValues({
        ...fields,
        [event.target.id]: event.target.value,
      })
    },
  ]
}

export default useForm
