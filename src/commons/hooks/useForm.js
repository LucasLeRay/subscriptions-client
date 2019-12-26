import { useState } from 'react'

function useForm(initialState) {
  const [fields, setValues] = useState(initialState)

  return [
    fields,
    (event, id) => {
      if (id) {
        setValues({
          ...fields,
          [id]: event.value,
        })
      } else {
        setValues({
          ...fields,
          [event.target.id]: event.target.value,
        })
      }
    },
  ]
}

export default useForm
