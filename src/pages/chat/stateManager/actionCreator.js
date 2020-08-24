export const ACTIONS = {
  CHAT_SELECTED: 'CHAT_SELECTED',
  MESSAGE_SUBMITTED: 'MESSAGE_SUBMITTED',
  CHAT_CLOSED: 'CHAT_CLOSED',
}

export const chatSelected = id => ({ type: ACTIONS.CHAT_SELECTED, payload: id })
export const submitMessage = text => ({ type: ACTIONS.MESSAGE_SUBMITTED, payload: text })
export const closeChat = () => ({ type: ACTIONS.CHAT_CLOSED })