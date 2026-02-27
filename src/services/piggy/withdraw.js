export const withdraw = (id, amount) => {

  console.log('withdraw called with:', { id, amount })
  
  return Promise.resolve({ id, amount, success: true })
}