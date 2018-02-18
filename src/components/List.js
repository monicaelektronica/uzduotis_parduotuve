import React, { Component } from 'react';

class List extends Component {
    constructor(props) {
        super(props);


        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.items.length / this.props.pageSize); i++) {
            pageNumbers.push(i);
        }
        this.state = {
            page: 0,
            pageNumbers: pageNumbers,
            filteredList: this.props.items,
            filteredSearch: this.props.items,
            priceFrom: undefined,
            priceTo: undefined,
            
        };
        // This binding is necessary to make `this` work in the callback
        this.leftPagination = this.leftPagination.bind(this);
        this.rightPagination = this.rightPagination.bind(this);
        this.searchList = this.searchList.bind(this);
        this.onSearchEvent = this.onSearchEvent.bind(this);
        this.filterListFrom = this.filterListFrom.bind(this);
        this.filterListTo = this.filterListTo.bind(this);
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
        if (this.state.page * this.props.pageSize + this.props.pageSize >= this.state.filteredSearch.length) {

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
    onSearchEvent(event){
        this.setState({searchValue: event.target.value})
        this.searchList(event.target.value, this.state.priceFrom, this.state.priceTo);
    }
    searchList(searchString, priceFrom, priceTo) {
        const searchValue = searchString;
        const filteredList = this.props.filterList(this.state.filteredList, priceFrom, priceTo);
        const searchedList = this.props.searchItems(filteredList, searchValue);
        const pageNumbers = [];
        console.log("asdf");
        for (let i = 1; i <= Math.ceil(searchedList.length / this.props.pageSize); i++) {
            pageNumbers.push(i);
        }
        this.setState({ filteredSearch: searchedList, pageNumbers: pageNumbers, page: 0 });
    }

    filterListFrom(event){
        this.setState({priceFrom: event.target.value});
        this.searchList(this.state.searchValue, event.target.value, this.state.priceTo);
    }
     filterListTo(event){
        this.setState({priceTo: event.target.value});
        this.searchList(this.state.searchValue, this.state.priceFrom, event.target.value);
    }
    render() {
        const filteredList = this.state.filteredSearch.slice(this.state.page * this.props.pageSize, this.state.page * this.props.pageSize + this.props.pageSize);
        return (
            <div className="list">
                <div className='search'>
                    <input className='search-input' type="search" placeholder="Paieška pagal miestą" onChange={this.onSearchEvent} />
                </div>
                <div>
                    <label htmlFor="from">Kaina nuo</label><input type="number" name="from" onChange={this.filterListFrom}/>
                    <label htmlFor="to">Kaina iki</label><input type="number" name="to" onChange={this.filterListTo}/>
                </div>
                <table>
                    <thead>
                        {this.props.renderHeader()}
                    </thead>
                    <tbody>
                        {filteredList.map((product, index) => this.props.renderItem(product, index))}
                    </tbody>
                </table>
                <div className='paging container'>
                    <button className='paging left-page' onClick={this.leftPagination}><i className="fa fa-angle-left fa-lg"></i></button>
                    {this.state.pageNumbers.map((number, index) =>
                        <button className='paging page' key={index} onClick={this.onPageClick.bind(this, index)}>
                            {number}
                        </button>
                    )}
                    <button className='paging right-page' onClick={this.rightPagination}><i className="fa fa-angle-right fa-lg"></i></button>
                </div>
            </div>
        );
    }
}

export default List;
