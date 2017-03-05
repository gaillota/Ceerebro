import {Folders} from '../../api/folders/folders';

export const FolderRepository = {
    // baseQuery(query, projection) {
    //     return Folders.find({
    //         ...query,
    //         ownerId: Meteor.userId()
    //     })
    // }
    findFolder({folderId, ownerId}) {
        return Folders.find({
            _id: folderId,
            ownerId,
        });
    },
    findFoldersIn({folderId, ownerId, query = {}, projection = {}}) {
        return Folders.find({
            parentId: folderId || {$exists: false},
            ownerId,
            ...query
        }, projection);
    }
};
