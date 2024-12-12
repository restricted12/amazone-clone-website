import React from 'react'
import { IoMenuSharp } from "react-icons/io5";
import Classes from "./header.module.css";
 function lower_header() {
  return (
    <section className={Classes.fixed2}>
    <div className={Classes.lower_container}>
      <ul>
        <li>
        <IoMenuSharp />
        <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
    </section>
  )
}
export default lower_header