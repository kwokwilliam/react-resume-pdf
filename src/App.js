import React, { Component } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import { faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import canvg from 'canvg';
import ReactDOMServer from 'react-dom/server';

class App extends Component {
    resume;

    constructor() {
        super();
        this.iconsToConvert = [
            {
                icon: faGithub,
                alt: 'github icon'
            },
            {
                icon: faMedium,
                alt: 'medium icon'
            }
        ]
        this.canvLoaded = false;
    }

    exportPDF = () => {
        this.resume.save();
    }

    convertSvgToImage = (arr) => {
        let canv = this.refs.canvas;
        if (!this.canvLoaded) {
            this.canvLoaded = true;
            canv.getContext("2d");
            arr.forEach((d, i) => {
                let htmlString = ReactDOMServer.renderToStaticMarkup(
                    <FontAwesomeIcon icon={d.icon} size={"3x"} style={{ color: '#005696', height: '500px', width: '500px' }} />
                );
                canvg(canv, htmlString);
                d.icon = canv.toDataURL("image/png");
            });
            this.setState({});
        }
    }

    componentDidMount() {
        this.convertSvgToImage(this.iconsToConvert);
    }

    render() {
        return (
            <div style={{ height: '100vh', width: '100vw', paddingTop: 20, backgroundColor: 'gray' }}>
                {!this.canvLoaded && <canvas ref="canvas" style={{ display: 'none' }}>
                </canvas>}
                <div style={{ textAlign: 'center', marginBottom: 10 }}><button onClick={this.exportPDF} style={{ margin: 'auto' }}>download</button></div>
                <PDFExport paperSize={'Letter'}
                    fileName="_____.pdf"
                    title=""
                    subject=""
                    keywords=""
                    ref={(r) => this.resume = r}>
                    <div style={{
                        height: 792,
                        width: 612,
                        padding: 'none',
                        backgroundColor: 'white',
                        boxShadow: '5px 5px 5px black',
                        margin: 'auto',
                        overflowX: 'hidden',
                        overflowY: 'hidden'
                    }}>Hi!
                    {this.canvLoaded && this.iconsToConvert.map((iconObject, index) => {
                            return <img src={iconObject.icon} key={'img-' + index} alt={iconObject.alt} style={{ height: 25, width: 25 }} />
                        })}
                    </div>
                </PDFExport>
            </div>
        );
    }
}

export default App;
