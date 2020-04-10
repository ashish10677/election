import React, { Component } from 'react';
import { Table, Button } from 'antd';
import ElectionBridge from '../../bridge';

class VotersTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: 'S No',
                    dataIndex: 'sno',
                    key: 'sno',
                }, {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                }, {
                    title: 'Candidate Id',
                    dataIndex: 'candidateId',
                    key: 'candidateId',
                }, {
                    title: 'Votes',
                    dataIndex: 'voteCount',
                    key: 'voteCount',
                    align: 'right'
                }, {
                    title: 'Action',
                    dataIndex: 'action',
                    key: 'action',
                    render: (text, record) => {
                        return <Button onClick={()=> {this.voteForCandidate(record)}}>Vote</Button>
                    }
                }
            ],
        }
    }

    componentDidMount() {
        this.setData(this.props.dataSource);
    }

    componentWillReceiveProps(newProps) {
        this.setData(newProps.dataSource);
    }

    setData = (dataSource) => {
        let newDataSource = dataSource.map((data, index) => {
            data["sno"] = index + 1;
            data["candidateId"] = data.candidateId;
            data["key"] = index + 1;
            return data;
        })
        this.setState({
            dataSource: newDataSource
        })
    }

    voteForCandidate = (record) => {
        let electionBridge = new ElectionBridge();
        electionBridge.voteForCandidate(record.candidateId).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return <Table columns={this.state.columns} dataSource={this.state.dataSource} pagination={false} />
    }
}

export default VotersTable;