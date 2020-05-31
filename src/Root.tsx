import * as React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Header from './components/layout/Header';
import Index from './pages/Index';
import Sign from './pages/auth/Sign';
import ServiceUseRule from './pages/auth/ServiceUseRule';
import PrivacyRule from './pages/auth/PrivacyRule';
import Mypage from './pages/Mypage';
import Write from './pages/Write';
import NotFound from './pages/NotFound';

const Root=() => {
    return(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Index}/>
                <Route exact path="/sign" component={Sign}/>
                <Route exact path="/service-rule" component={ServiceUseRule}/>
                <Route exact path="/privacy-rule" component={PrivacyRule}/>
                <Route exact path="/write" component={Write}/>
                <Route exact path="/mypage" component={Mypage}/>
                <Route exact path="/detail/:id" component={Write}/>
                <Route path="" component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Root;