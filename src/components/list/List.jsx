import React from 'react'
import "./List.css"
import UserInfo from './userInfo/UserInfo'
import ChatList from './ChatList/ChatList'

function List() {
  return (
    <div className='list  flex flex-col bg-[rgba(0,0,0,0.41)] rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10.7px] border-[1px] border-solid border-[rgba(0,0,0,1)]"'>
      <UserInfo/>
      <ChatList/>
    </div>
  )
}

export default List
