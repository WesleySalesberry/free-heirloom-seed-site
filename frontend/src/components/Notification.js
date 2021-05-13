import React,{ Children, useState } from 'react'
import { Alert } from 'react-bootstrap'

export const Notification = ({ variant, children }) => {
    const [ isShowing, setIsShowing ] = useState(true)

    return  (
        
            isShowing && <Alert
                className="text-center"
                variant={variant}
                onClose={() => setIsShowing(false)}
                dismissible
            >
                {children}
            </Alert>
        
    )

    // return isShowing ? 
    // (
    //     <Alert
    //         className="text-center"
    //         variant={variant}
    //         onClose={() => setIsShowing(false)}
    //         dismissible
    //     >
    //             {children}
    //     </Alert>
    // )
    // :
    // (
    //     <div></div>
    // )

}
