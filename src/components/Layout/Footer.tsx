import React from 'react'
import styles from './index.module.less'

interface LinkItem {
  key: string
  title: React.ReactNode
  href?: string
  blankTarget?: boolean
}

interface FooterProps {
  links?: LinkItem[]
  copyright?: React.ReactNode
}

const Footer = ({ links, copyright }: FooterProps) => {
  return (
    <footer className={styles.footer}>
      {links && <div className={styles.links}>
        {links.map((link) => (
          <a
            key={link.key}
            title={link.key}
            target={link.blankTarget ? '_blank' : '_self'}
            href={link.href}
            rel="noreferrer"
          >
            {link.title}
          </a>
        ))}
      </div>}
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </footer>
  )
}

export default Footer
