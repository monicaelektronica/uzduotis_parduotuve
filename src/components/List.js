import React, { Component } from 'react';

const products = [
    {
        from: 'Vilnius',
        to: 'Varšuva',
        transport: 'L',
        price: '65',
        quantity: 10
    },
    {
        from: 'Vilnius',
        to: 'Varšuva',
        transport: 'A',
        price: '50',
        quantity: 10
    },
    {
        from: 'Vilnius',
        to: 'Palanga',
        transport: 'A',
        price: '50',
        quantity: 10
    },
    {
        from: 'Vilnius',
        to: 'Panevėžys',
        transport: 'L',
        price: '65',
        quantity: 10
    },
    {
        from: 'Kaunas',
        to: 'Palanga',
        transport: 'A',
        price: '50',
        quantity: 10
    },
    {
        from: 'Vilnius',
        to: 'Varšuva',
        transport: 'A',
        price: '50',
        quantity: 10
    }
]

const pageSize = 4;

class List extends Component {
    constructor(props) {
        super(props);


        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(products.length / pageSize); i++) {
            pageNumbers.push(i);
        }
        this.state = {
            page: 0,
            pageNumbers: pageNumbers,
            filteredList: [],
            filteredSearch: products
        };
        // This binding is necessary to make `this` work in the callback
        this.leftPagination = this.leftPagination.bind(this);
        this.rightPagination = this.rightPagination.bind(this);
        this.searchList = this.searchList.bind(this);
    }
    componentWillMount() {

    }

    leftPagination() {
        if (this.state.page <= 0) {

        } else {
            this.setState({
                page: this.state.page - 1,
            });
        }
    }
    rightPagination() {
        if (this.state.page * pageSize + pageSize >= this.state.filteredSearch.length) {

        } else {
            this.setState({
                page: this.state.page + 1,
            });
        }
    }
    onPageClick(pageNumber) {
        this.setState({
            page: pageNumber,
        });
    }
    searchList(event) {
        console.log(event.target.value);
        const searchValue = event.target.value;
        let searchList = products;
        if (searchValue != "" && searchValue != null ) {
            console.log(searchValue);
            searchList = products.filter(product => {
                if (product.to.toLowerCase().includes(searchValue.toLowerCase())) {
                    return true;
                }
                else {
                    return false;
                }
            })
        }
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(searchList.length / pageSize); i++) {
            pageNumbers.push(i);
        }
        this.setState({ filteredSearch: searchList, pageNumbers: pageNumbers });
    }
    render() {

        //const filteredList = this.state.filteredSearch;
        const filteredList = this.state.filteredSearch.slice(this.state.page * pageSize, this.state.page * pageSize + pageSize);
        console.log(this.state.pageNumbers);
        return (

            <div className="List">
                <div>
                    <input type="search" placeholder="Paieška" onChange={this.searchList} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Transportas</th>
                            <th>Iš</th>
                            <th>Į</th>
                            <th>Kiekis</th>
                            <th>Kaina</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredList.map((product, index) =>
                            <tr key={index}>
                                <td>{product.transport}</td>
                                <td>{product.from}</td>
                                <td>{product.to}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                            </tr>)}
                    </tbody>
                </table>
                <div>
                    <button onClick={this.leftPagination}>K</button>
                    <div>
                        {this.state.pageNumbers.map((number, index) =>
                            <div key={index} onClick={this.onPageClick.bind(this, index)}>
                                {number}
                            </div>
                        )}
                    </div>
                    <button onClick={this.rightPagination}>D</button>
                </div>
            </div>
        );
    }
}

export default List;
