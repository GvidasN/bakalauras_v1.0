import React from 'react';

import Footer from './Footer';
import TopBar from './TopBar';

export default function MainPageLayout(props){
    const { children } = props;

    return (
        <div>
            <TopBar/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    );
}