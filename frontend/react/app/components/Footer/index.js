import React from 'react';
import ContentSection from '../ContentSection';
import Social from '../Social';

import Select from 'react-select';
import 'react-select/dist/react-select.css';


export class Footer extends React.Component { // eslint-disable-line react/prefer-stateless-function
    frontendOptions = [
        { value: 'react', label: 'React' },
        { value: 'angular', label: 'Angular' },
        { value: 'vue', label: 'Vue' }
    ];

    backendOptions = [
        { value: 'node', label: 'node.js' },
        { value: 'php', label: 'php' },
        { value: 'ruby', label: 'ruby' }
    ]

    changeFrontEnd(option){
        this.setState({ frontend:option })
    }

    changeBackEnd(option){
        this.setState({ backend:option })
    }

constructor(props) {
    super(props);
    this.state = { 
         frontend: this.frontendOptions[0]
        ,backend: this.backendOptions[0]
     };
  }

  refresh () {
      window.location = `?stack=${this.state.frontend.value}+${this.state.backend.value}`;
  }

  render() {
    var frontendOptions = [
        { value: 'react', label: 'React' },
        { value: 'react', label: 'More Coming Soon!' }
        // { value: 'angular', label: 'Angular' },
        // { value: 'vue', label: 'Vue' }
    ];

    var backendOptions = [
        { value: 'node', label: 'node.js' },
        { value: 'node', label: 'More Coming Soon!' }
        // { value: 'php', label: 'php' },
        // { value: 'ruby', label: 'ruby' }
    ];

    if(this.state){
        var frontendValue = this.state.frontend;
        var backendValue = this.state.backend;
    }else{
        var frontendValue = frontendOptions[0];
        var backendValue = backendOptions[0];
    }

    var frontendSelect = <div className="dib v-mid" style={{ "width":"120px" }}><Select
        value={frontendValue}
        options={frontendOptions}
        onChange={(option) => { this.changeFrontEnd(option) }}
        clearable={false}
        searchable={false}
    /></div>

    var backendSelect = <div className="dib v-mid" style={{ "width":"120px" }}><Select
        value={backendValue}
        options={backendOptions}
        onChange={(option) => { this.changeBackEnd(option) }}
        clearable={false}
        searchable={false}
    /></div>
    
    return (
        <ContentSection color="#323338">
            <div className="pv4 ph3 ph5-ns tc">
                <Social />
            </div>



            <div className="w-100 tc white">Showing the {frontendSelect} + {backendSelect} version of benlorantfy.com <input className="pa2 ba b--white pointer ml2" type="button" value="Refresh" onClick={() => { this.refresh() }} /></div>
            <div className="w-100 tc white mt3">Made with &hearts; in Kitchener, Ontario</div>
        </ContentSection>
    );
  }
}

export default Footer;