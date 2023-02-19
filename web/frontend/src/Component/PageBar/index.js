import React from 'react'
import { Pagination } from 'react-bootstrap'
import './style.css'

const PageBar = ({ lastIndex, activePage, changePage }) => {
  let items = []
  let start = parseInt(activePage / 11) * 10 + 1
  let isFirst = parseInt(activePage / 11) === 0
  let isLast = lastIndex - activePage < 10

  if (isLast) {
    for (let number = start; number <= lastIndex; number++) {
      items.push(
        <Pagination.Item
          onClick={() => {
            changePage(number)
          }}
          key={number}
          active={number === activePage}
        >
          {number}
        </Pagination.Item>
      )
    }
  } else {
    for (let number = start; number <= start + 9; number++) {
      items.push(
        <Pagination.Item
          onClick={() => {
            changePage(number)
          }}
          key={number}
          active={number === activePage}
        >
          {number}
        </Pagination.Item>
      )
    }
  }
  return (
    <Pagination style={{ justifyContent: 'center' }}>
      {isFirst ? (
        <></>
      ) : (
        <>
          <Pagination.First
            onClick={() => {
              changePage(1)
            }}
          />
          <Pagination.Prev
            onClick={() => {
              changePage(start - 1)
            }}
          />
        </>
      )}
      {items}
      {isLast ? (
        <></>
      ) : (
        <>
          <Pagination.Next
            onClick={() => {
              console.log(start + 10)
              changePage(start + 10)
            }}
          />
          <Pagination.Last
            onClick={() => {
              changePage(lastIndex)
            }}
          />
        </>
      )}
    </Pagination>
  )
}

export default PageBar
