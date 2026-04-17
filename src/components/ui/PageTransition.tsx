import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

interface PageTransitionProps extends PropsWithChildren {
    className?: string
}

export default function PageTransition({
    className = '',
    children,
}: PageTransitionProps) {
    return (
        <motion.section
            className={className}
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(2px)' }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
        >
            {children}
        </motion.section>
    )
}