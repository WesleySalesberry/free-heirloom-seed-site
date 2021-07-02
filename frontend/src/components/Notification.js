import React,{ useState } from 'react'
import { Alert } from 'react-bootstrap'

export const Notification = ({ variant, children }) => {
    const [ isShowing, setIsShowing ] = useState(true)

    return  (
        
            isShowing && <Alert
                className="text-center text-dark"
                variant={variant}
                onClose={() => setIsShowing(false)}
                dismissible
            >
                {children}
            </Alert>
        
    )

}
