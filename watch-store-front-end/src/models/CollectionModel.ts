class CollectionModel {
    collectionId: number;
    name?: string;

    constructor(collectionId: number, name: string) {
        this.collectionId = collectionId;
        this.name = name;
    }
}

export default CollectionModel;