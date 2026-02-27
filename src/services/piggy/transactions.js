export const someFunction = (param1, param2) => {
  
  console.log('someFunction called with:', { param1, param2 })
  
  return Promise.resolve({
    success: true,
    data: {}
  })
}