import React, { useState, useEffect } from 'react';

class Api {
  constructor(options) {
    this._url = options.baseUrl; // http://mesto42back.nomoredomains.icu
    this._headers = options.headers;
  }

  getUserInfo() {
    this._headers.authorization = localStorage.getItem('jwt');
    return fetch(this._url+'/users/me', {
      headers: this._headers
    }).then(this._handleResponse)
  }

  editUserAvatar(avatar) {
    this._headers.authorization = localStorage.getItem('jwt');
    return fetch(this._url+'/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    }).then(this._handleResponse)
  }

  editUserInfo(name, about) {
    this._headers.authorization = localStorage.getItem('jwt');
    return fetch(this._url+'/users/me', {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._handleResponse)
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    this._headers.authorization = localStorage.getItem('jwt');
    return fetch(this._url+'/cards', {
      headers: this._headers
    }).then(this._handleResponse)
  }

  postNewCard(name, link) {
    this._headers.authorization = localStorage.getItem('jwt');
    return fetch(this._url+'/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(this._handleResponse)
  }

  deleteCard(cardId) {
    this._headers.authorization = localStorage.getItem('jwt');
    return fetch(this._url+`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._handleResponse)
  }

  _putLikeCard(cardId) {
    this._headers.authorization = localStorage.getItem('jwt');
    return fetch(this._url+`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._handleResponse)
  }

  _deleteLikeCard(cardId) {
    this._headers.authorization = localStorage.getItem('jwt');
    return fetch(this._url+`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._handleResponse)
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._deleteLikeCard(cardId);
    } else {
      return this._putLikeCard(cardId);
    }
  }
}

const api = new Api({
  baseUrl: 'https://mesto42back.nomoredomains.icu',
  headers: {
    authorization: localStorage.getItem('jwt'),
    'Content-Type': 'application/json'
  }
});
//61002a8de12f5500f2659bfa

export default api;