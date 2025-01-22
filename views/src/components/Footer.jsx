import React from 'react'
import { Link } from 'react-router-dom'
import config from '../../../config/config.js'

const Footer = () => {
  return (
    <footer className=" dark:bg-[#131e29]">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-center">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link href="/" className="hover:underline">{config.org}</Link>. All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
