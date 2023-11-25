

export const sortUserBySelectedValue = (allUsers = [], selectedValue, t) => {
    return allUsers.sort((userA, userB) => {
        if (selectedValue === t('dropdownSorting.lowtoHighIncome')) return userA.allIncomes - userB.allIncomes;
        if (selectedValue === t('dropdownSorting.hightoLowIncome')) return userB.allIncomes - userA.allIncomes;
        return userA.fullName > userB.fullName ? 1 : -1;
    })
};

export const filterUsers = (allUsers = [], sortedValue, searchedValue, t) => {
    const arrayToFilter = sortedValue ? sortUserBySelectedValue(allUsers, sortedValue, t) : allUsers;
    return arrayToFilter.filter(({ fullName, phoneNumber, email }) => {
        return fullName.includes(searchedValue) || phoneNumber.includes(searchedValue) || email.includes(searchedValue);
    })
}