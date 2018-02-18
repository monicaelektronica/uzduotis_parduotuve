import React, { Component } from 'react';
import List from '../components/List.js';
import Tickets from '../data/tickets.js';
import orders from '../data/orders.js';

class Orders extends Component {
    constructor(props) {
        super(props);


        const ordersList = [];
        for (let i = 0; i < orders.length; i++) {
            ordersList.push({
                _id: orders[i]._id,
                dateCreated: orders[i].dateCreated,
                ticket: Tickets.find(ticket => ticket._id === orders[i].flight)
            });
        }
        this.state = {
            ordersList: ordersList
        }
    }
    searchItems(items, searchValue) {
        let searchedList = items;
        if (searchValue !== "" && searchValue !== null && searchValue !== undefined) {
            searchedList = items.filter(product => {
                if (product.ticket.to.toLowerCase().includes(searchValue.toLowerCase())
                || product.ticket.from.toLowerCase().includes(searchValue.toLowerCase())) {
                    return true;
                }
                else {
                    return false;
                }
            })
        }
        return searchedList;
    }
    filterList(items, priceFrom, priceTo){
        return items.filter(item => {
            if((priceFrom === undefined || priceFrom == '') || (priceTo === undefined || priceTo == '')){
                return true
            }
            if(item.ticket.price >= priceFrom && item.ticket.price <= priceTo)
                return true;
            
            return false;
        });
    }
    renderHeader() {
        return (
            <tr>
                <th>Transportas</th>
                <th>Iš</th>
                <th>Į</th>
                <th>Kaina</th>
                <th>Užsakymo data</th>
            </tr>
        );
    }
    renderListItem(listItem, index) {
        if (listItem.ticket !== undefined) {
            return (
                <tr key={index}>
                    <td>{listItem.ticket.transport === 'L'?"Lėktuvas":"Autobusas"}</td>
                    <td>{listItem.ticket.from}</td>
                    <td>{listItem.ticket.to}</td>
                    <td>{listItem.ticket.price}</td>
                    <td>{listItem.dateCreated}</td>
                </tr>
            )
        }else
        {
            return null;
        }
    }
    render() {
        return (
            <div>
                <h2>Užsakymai</h2>
                <List
                    items={this.state.ordersList}
                    searchItems={this.searchItems}
                    renderHeader={this.renderHeader}
                    renderItem={this.renderListItem}
                    filterList={this.filterList}
                    pageSize={20} />
            </div>
        );
    }
}

export default Orders;
