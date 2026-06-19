const BASE_URL = '/api'

export async function getUsers() {
  const response = await fetchAuth(`${BASE_URL}/users/`)
  if (!response.ok) throw new Error('Erreur lors de la récupération des utilisateurs')
  return response.json()
}

export async function deleteUser(id) {
  const response = await fetchAuth(`${BASE_URL}/users/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Erreur lors de la suppression')
  return response.json()
}

export async function createUser(userData) {
  const response = await fetchAuth(`${BASE_URL}/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  if (!response.ok) throw new Error('Erreur lors de la création')
}

export async function updateUser(id, userData) {
  const response = await fetchAuth(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  if (!response.ok) throw new Error('Erreur lors de la mise à jour')
  return response.json()
}

export async function getPrestations() {
  const response = await fetchAuth(`${BASE_URL}/prestation/`)
  if (!response.ok) throw new Error('Erreur lors de la récupération des prestations')
  return response.json()
}

export async function deletePrestation(id) {
  const response = await fetchAuth(`${BASE_URL}/prestation/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Erreur lors de la suppression')
  return response.json()
}

export async function createPrestation(data) {
  const response = await fetchAuth(`${BASE_URL}/prestation/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Erreur lors de la création')
}

export async function updatePrestation(id, data) {
  const response = await fetchAuth(`${BASE_URL}/prestation/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Erreur lors de la mise à jour')
  return response.json()
}

export async function getCategories() {
  const response = await fetchAuth(`${BASE_URL}/categories/`)
  if (!response.ok) throw new Error('Erreur lors de la récupération des catégories')
  return response.json()
}

export async function deleteCategorie(id) {
  const response = await fetchAuth(`${BASE_URL}/categories/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Erreur lors de la suppression')
  return response.json()
}

export async function createCategorie(data) {
  const response = await fetchAuth(`${BASE_URL}/categories/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Erreur lors de la création')
  return response.json()
}

export async function updateCategorie(id, data) {
  const response = await fetchAuth(`${BASE_URL}/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Erreur lors de la mise à jour')
  return response.json()
}

export async function getEvenements() {
  const response = await fetchAuth(`${BASE_URL}/evenements/`)
  if (!response.ok) throw new Error('Erreur lors de la récupération des événements')
  return response.json()
}

export async function deleteEvenement(id) {
  const response = await fetchAuth(`${BASE_URL}/evenements/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Erreur lors de la suppression')
  return response.json()
}

export async function createEvenement(data) {
  const response = await fetchAuth(`${BASE_URL}/evenements/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Erreur lors de la création')
  return response.json()
}

export async function updateEvenement(id, data) {
  const response = await fetchAuth(`${BASE_URL}/evenements/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Erreur lors de la mise à jour')
  return response.json()
}

export async function login(mail,password){
  const response = await fetch('/api/auth/login',{
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({mail, password}),
  })
  if (!response.ok) throw new Error('Identifiants incorrects')
  const data = await response.json()
  localStorage.setItem('token', data.token)
}
export async function fetchAuth(url, options = {}) {
  const token = localStorage.getItem('token')

  const headers = {
    ...options.headers,                      
    'Authorization': 'Bearer ' + token,      
  }

  return fetch(url, { ...options, headers }) 
}