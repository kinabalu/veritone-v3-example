import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import hamburger from '../img/icons/bars.svg'

export default ({ navOpen, toggleNav, toggleContact }) => {

  const handleHamburgerClick = () => {
    toggleNav(!navOpen)
  }

  const handleContactClick = () => {
    toggleContact(true)
  }

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            url
          }
        }
        wordpressSiteMetadata {
          name
          url
          home
        }
        wordpressMenusMenusItems(slug: { eq: "navigation" }) {
          id
          slug
          items {
            title
            slug
            classes
          }
        }
      }
    `
  )
  return (
    <header className='header clear'>
      <div className='wrapper'>
        <Link to='/' className='logo'>
        {data.wordpressSiteMetadata.name}
        </Link>
        <label id='mobile-hamburger-label' htmlFor='mobile-hamburger-checkbox'>
          <img src={hamburger} alt='Toggle Menu' />
        </label>
        <input
          id='mobile-hamburger-checkbox'
          type='checkbox'
          onChange={handleHamburgerClick}
          checked={navOpen} />
        <div id='navigation' className='wrapper'>
          <ul id='menu-header-menu' className={navOpen ? 'menu visible' : 'menu'}>
            {data.wordpressMenusMenusItems.items.map(
               ({ title, slug, classes }, index) => {
                 const contact = classes.includes('js-open-contact-modal')
                 return (
                   <li
                     onClick={contact ? handleContactClick : null}
                     className={`menu-item page_item ${classes}`}
                     key={index}
                     style={navOpen ? { transitionDelay: `${(index + 1) * 100}ms` } : null}>
                     {!contact ?
                        <Link to={slug === data.site.siteMetadata.url ? `/` : slug}>
                        {title}
                        </Link>
                        : <a href='#contact'>
                            {title}
                          </a>}
                   </li>
                 )}
             )}
          </ul>
        </div>
      </div>
    </header>
  )
}
