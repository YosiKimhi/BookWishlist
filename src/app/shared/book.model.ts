export class Book {
    constructor(
        public id:string,
        public title:string ,
        public authors:string[],
        public description:string,
        public categories:string[],
        public publisher:string,
        public imageLink:string,
        public previewLink:string,
        public language:string,
        public ratingCount:number
        ){
        this.id=id;
        this.title=title;
        this.authors=authors;
        this.description=description;
        this.publisher=publisher;
        this.categories=categories;
        this.imageLink=imageLink;
        this.previewLink=previewLink;
        this.language=language;
        this.ratingCount=ratingCount;
    }
}