const jwtUtil = {
  getToken: (bearerToken: string) => {
    return bearerToken.replace(/^Bearer\s/, '')
  }
}

export default jwtUtil
