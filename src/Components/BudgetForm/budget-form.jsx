import React, { Component } from 'react';
import { Button, Form, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './budget-form.scss';

class BudgetForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            spouse1Name: '',
            spouse2Name: '',
            income1: '',
            income2: '',
            totalIncome: '',
            rent: '',
            otherBills: '',
            savingsGoal: '',
            spouse1AcctDeposit: '',
            spouse2AcctDeposit: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = () => {
        let totalIncome = parseFloat(this.state.income1) + parseFloat(this.state.income2);
        totalIncome = totalIncome.toFixed(2);
        let totalDue = parseFloat(this.state.rent) + parseFloat(this.state.otherBills) + parseFloat(this.state.savingsGoal);
        totalDue = totalDue.toFixed(2);
        let spouse1Percentage = parseFloat(this.state.income1) / totalIncome;
        let spouse2Percentage = parseFloat(this.state.income2) / totalIncome;
        let leftOver = parseFloat(totalIncome) - parseFloat(totalDue);
        leftOver = leftOver.toFixed(2);

        this.setState({
            totalIncome: totalIncome,
            spouse1AcctDeposit: (leftOver * spouse1Percentage).toFixed(2),
            spouse2AcctDeposit: (leftOver * spouse2Percentage).toFixed(2)
        });
    };

    render(){
        return (
            <>
                <div className='app__form'>
                    <div className='app__form-header'>
                        <h1>
                            Monthly Budget Contributions
                        </h1>
                    </div>
                    <div className='app__form-form'>
                        <Form>
                            <div className='app__form-item'>
                                <Label for='spouse1Name'>
                                    Spouse 1 Name:
                                    <Input type='text' name ='spouse1Name'
                                        value = {this.state.spouse1Name}
                                        onChange = {this.handleChange}
                                    />
                                </Label>
                            </div>
                            <div className='app__form-item'>
                                <Label for='spouse2Name'>
                                    Spouse 2 Name:
                                    <Input type='text' name ='spouse2Name'
                                        value = {this.state.spouse2Name}
                                        onChange = {this.handleChange}
                                    />
                                </Label>
                            </div>
                            <div className='app__form-item'>
                                <Label for='income1'>
                                    Spouse 1 Income:
                                    <Input type = 'number' min='0.01' step='0.01' name ='income1'
                                        value = {this.state.income1}
                                        onChange = {this.handleChange}
                                    />
                                </Label>
                            </div>
                            <div className='app__form-item'>
                                <Label for='income2'>
                                    Spouse 2 Income:
                                    <Input type = 'number' min='0.01' step='0.01' name ='income2'
