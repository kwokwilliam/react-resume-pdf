import React, { Component } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';

class App extends Component {
    resume;

    constructor() {
        super();
    }

    exportPDF = () => {
        this.resume.save();
    }

    render() {
        return (
            <div style={{ height: '100vh', width: '100vw', paddingTop: 20, backgroundColor: 'gray' }}>
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
                    }}>content</div>
                </PDFExport>
            </div>
        );
    }
}

export default App;
