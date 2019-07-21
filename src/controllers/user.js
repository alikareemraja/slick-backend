"use strict";

const UserModel = require("../models/user");


const getOwnedItems = (req, res) => {
    UserModel.findById(req.params.uid).select("ownedItems").exec()
        .then(ownedItems => {

            if (!ownedItems) return res.status(404).json({
                error: "Not Found",
                message: "Owned items not found"
            });

            res.status(200).json(ownedItems)

        })
        .catch(error => res.status(500).json({
            error: "Internal Server Error",
            message: error.message
        }));

};



const getOwnedItem = (req, res) => {
    UserModel.findOne({"_id": req.params.uid, "ownedItems._id": req.params.itemId }).select("ownedItems.$").exec()
        .then(ownedItem => {

            if (!ownedItem) return res.status(404).json({
                error: "Not Found",
                message: "Owned item not found"
            });

            res.status(200).json(ownedItem.ownedItems[0])

        })
        .catch(error => res.status(500).json({
            error: "Internal Server Error",
            message: error.message
        }));

};

const addOwnedItem = (req, res) => {
          UserModel.findByIdAndUpdate( req.params.uid, { $push: {ownedItems: req.body } } )
          .then(item => res.status(200).json(item))
          .catch(error => res.status(500).json({
              error: 'Internal server error',
              message: error.message
          }));
}

const deleteOwnedItem = (req, res) => {
    //UserModel.updateOne( {"_id": req.params.userId}, { $pull: {"ownedItems.itemId": req.params.itemId } } )
    UserModel.findByIdAndUpdate( req.params.uid, { $pull: {ownedItems: { _id: req.params.itemId } } } )
    .then(item => res.status(200).json(item))
    .catch(error => res.status(500).json({
        error: 'Internal server error',
        message: error.message
    }));
};

const updateOwnedItem = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }
    
    UserModel.updateOne( {"_id": req.params.uid, "ownedItems._id": req.params.itemId }, { $set: { "ownedItems.$": req.body } },{
        new: true,
        runValidators: true}).exec()
        .then(item => res.status(200).json(item))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));

};

const getWishlistItems = (req, res) => {
    UserModel.findById(req.params.uid).select("wishlist").exec()
        .then(wishlist => {

            if (!wishlist) return res.status(404).json({
                error: "Not Found",
                message: "Wishlist not found"
            });
            
            res.status(200).json(wishlist)

        })
        .catch(error => res.status(500).json({
            error: "Internal Server Error",
            message: error.message
        }));

};

const addWishlistItem = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }
    
    UserModel.findByIdAndUpdate( req.params.userId, { $push: {wishlist: mongoose.Types.ObjectId(req.body.itemId) } } )
    .then(item => res.status(200).json(item))
    .catch(error => res.status(500).json({
        error: 'Internal server error',
        message: error.message
    }));
}

const deleteWishlistItem = (req, res) => {
    UserModel.updateOne( {"_id": req.params.userId}, { $pull: {"wishlist": req.params.itemId } } )
    .then(item => res.status(200).json(item))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

module.exports = {
    getOwnedItems,
    getOwnedItem,
    addOwnedItem,
    deleteOwnedItem,
    getWishlistItems,
    addWishlistItem,
    updateOwnedItem,
    deleteWishlistItem
};