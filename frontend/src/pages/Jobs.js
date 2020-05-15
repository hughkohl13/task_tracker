import React, { Component } from 'react';

import Modal from '../components/Navigation/Modal/Modal';
import Backdrop from '../components/Navigation/Backdrop/Backdrop';
import AuthContext from '../context/auth-context';
import './Jobs.css';

class JobsPage extends Component {
    state = {
        creating: false,
        jobs: []
    };
    
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.roleElRef = React.createRef();
        this.companyElRef = React.createRef();
        this.descriptionElRef = React.createRef();
        this.urlElRef = React.createRef();
        this.dateElRef = React.createRef();
    }

    componentDidMount() {
        this.fetchJobs();
    }

    startCreateJobHandler = () => {
        this.setState({creating: true});
    };

    modalConfirmHandler = () => {
        this.setState({creating: false});
        const role = this.roleElRef.current.value;
        const company = this.companyElRef.current.value;
        const description = this.descriptionElRef.current.value;
        const url = this.urlElRef.current.value;
        const date = this.dateElRef.current.value;

        if (
            role.trim().length === 0 || 
            company.trim().length === 0 || 
            description.trim().length === 0 || 
            url.trim().length === 0 || 
            date.trim().length === 0
        ) {
            return;
        }

        const job = {role, company, description, url, date};
        console.log(job);

        const requestBody = {
                query: `
                    mutation {
                        createJob(jobInput: {role: "${role}", company: "${company}", description: "${description}", url: "${url}", date: "${date}"}) {
                            _id
                            role
                            company
                            description
                            url
                            date
                            creator {
                                _id
                                email
                            }
                        }
                    }
                `
        };

    const token = this.context.token;

    fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            if(res.status !== 200 && res.status !==201) {
                throw new Error('Failed');
            }
            return res.json();
        })
        .then(resData => {
            console.fetchJobs();
        })
        .catch(err=> {
            console.log(err);
        })
    }

    modalCancelHandler = () => {
        this.setState({creating: false});
    };

    fetchJobs() {
        const requestBody = {
            query: `
                query {
                    jobs {
                        _id
                        role
                        company
                        description
                        url
                        date
                        creator {
                            _id
                            email
                        }
                    }
                }
            `
    };

    fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if(res.status !== 200 && res.status !==201) {
                throw new Error('Failed');
            }
            return res.json();
        })
        .then(resData => {
            const jobs = resData.data.jobs;
            this.setState({ jobs: jobs });
        })
        .catch(err=> {
            console.log(err);
        });
    }


    render () {
        const jobList = this.state.jobs.map(event => {
            return (
                <li key={job._id} className="jobs__list-item">
                    {job.title}
                </li>
            );
        });


        return (
        <React.Fragment>
            {this.state.creating && <Backdrop/>}
            {this.state.creating && (
                <Modal 
                    title="Add Job" 
                    canCancel 
                    canConfirm 
                    onCancel={this.modalCancelHandler} 
                    onConfirm={this.modalConfirmHandler}
                    >
                    <form>
                        <div className="form-control">
                            <label htmlFor="role"> Role </label>
                            <input type="text" id="role" ref={this.roleElRef}/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="company"> Company </label>
                            <input type="text" id="company" ref={this.companyElRef}/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="decription"> Description </label>
                            <textarea type="text" id="decription" rows="4" ref={this.descriptionElRef}/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="url"> URL </label>
                            <input type="text" id="url" ref={this.urlElRef}/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="date"> Date </label>
                            <input type="date" id="date" ref={this.dateElRef}/>
                        </div>
                    </form>
                </Modal>
                )}

                {this.context.token && (
                    <div className="jobs-control">  
                        <p> Create your own jobs </p>
                        <button className="btn" onClick={this.startCreateJobHandler}> Create Job </button>
                    </div>
                )}
                <ul className="jobs__list">{jobList}</ul>
        </React.Fragment>
        );
    }
}

export default JobsPage;