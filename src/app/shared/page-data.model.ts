export class PageData {
    constructor(
        public currentPage:number,
        public hasNextPage:boolean,
        public hasPreviousPage:boolean,
        public nextPage:number,
        public previousPage:number,
        public lastPage:number
        ){}
}