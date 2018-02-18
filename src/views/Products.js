import React, { Component } from 'react';
import List from '../components/List.js';
import Tickets from '../data/tickets.js';
class Products extends Component {

    searchItems(items, searchValue) {
        let searchedList = items;
        if (searchValue !== undefined && searchValue !== "" && searchValue !== null) {
            searchedList = items.filter(product => {
                if (product.to.toLowerCase().includes(searchValue.toLowerCase())
                || product.from.toLowerCase().includes(searchValue.toLowerCase())) {
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
            if(item.price >= priceFrom && item.price <= priceTo)
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
                <th>Kiekis</th>
                <th>Kaina</th>
            </tr>
        );
    }
    renderListItem(listItem, index) {
        return (
            <tr key={index}>
                <td>{listItem.transport === 'L'?"Lėktuvas":"Autobusas"}</td>
                <td>{listItem.from}</td>
                <td>{listItem.to}</td>
                <td>{listItem.quantity}</td>
                <td>{listItem.price}</td>
            </tr>
        )
    }
    render() {
        return (
            <div>
                <h2>Bilietai</h2>
                <List
                    items={Tickets}
                    searchItems={this.searchItems}
                    renderHeader={this.renderHeader}
                    renderItem={this.renderListItem}
                    filterList={this.filterList}
                    pageSize={10} />
            </div>
        );
    }
}

export default Products;
