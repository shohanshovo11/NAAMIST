const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
const Alumni = require('../models/alumni');
const { generateId } = require('../utils/generateId');

// Get all Alumni excluding the password field
exports.getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find().select('-password'); // Exclude password field
    console.log(alumni, "alumnimem");
    // const totalAlumni = 0;
    let gm = 0;
    let lm = 0;
    alumni.forEach((alum)=>{
      if(alum.alumniType === 'GM') {
        gm+=1;
      } else if(alum.alumniType === 'LM') {
        lm+=1;
      }
    });
    res.status(200).json({
      alumniData: alumni,
      total: gm + lm,
      gm,
      lm
    });
  } catch (error) {
    console.error('Error fetching alumni:', error);
    res.status(500).json({ message: 'Failed to retrieve alumni' });
  }
};

// Controller function to get all authorized alumni for the alumni page
exports.getAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find({ isAuthorized: true }).select(
      'name email batch workplace workSectorType designation facebook linkedin profilePic bloodGroup'
    );
    res.status(200).json(alumni);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching alumni details', error });
  }
};

// Get Alumni by ID
exports.getAlumniById = async (req, res) => {
  try {
    const { id } = req.params;
    const alumni = await Alumni.findById(id).select('-password'); // Exclude password field

    if (!alumni) {
      return res.status(404).json({ message: 'Alumni not found with the provided ID' });
    }

    res.status(200).json(alumni);
  } catch (error) {
    console.error('Error fetching alumni by ID:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Alumni by email
exports.getAlumniByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const alumni = await Alumni.findOne({ email }).select('-password'); // Exclude password field

    if (!alumni) {
      return res.status(404).json({ message: 'Alumni not found with the provided email' });
    }

    res.status(200).json(alumni);
  } catch (error) {
    console.error('Error fetching alumni by email:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Approve Alumni
exports.approveAlumni = async (req, res) => {
  try {
    const { id, alumniType } = req.params;
    const updatedAlumni = await Alumni.findByIdAndUpdate(
      id,
      { isAuthorized: true, alumniType },
      { new: true }
    );

    if (!updatedAlumni) {
      return res.status(404).json({ message: 'Alumni not found' });
    }

    res.status(200).json({
      message: 'Alumni approved successfully',
      data: updatedAlumni,
    });
  } catch (error) {
    console.error('Error approving alumni:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Alumni by _id or email
exports.deleteAlumni = async (req, res) => {
  try {
    const { id, email } = req.params;

    if (id) {
      const deletedAlumni = await Alumni.findByIdAndDelete(id);

      if (!deletedAlumni) {
        return res.status(404).json({ message: 'Alumni not found with the provided _id' });
      }

      return res.status(200).json({ message: 'Alumni deleted successfully', data: deletedAlumni.name });
    }

    if (email) {
      const deletedAlumni = await Alumni.findOneAndDelete({ email });

      if (!deletedAlumni) {
        return res.status(404).json({ message: 'Alumni not found with the provided email' });
      }

      return res.status(200).json({ message: 'Alumni deleted successfully', data: deletedAlumni.name });
    }

    return res.status(400).json({ message: 'Please provide either an _id or email to delete alumni' });
  } catch (error) {
    console.error('Error deleting alumni:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const existingAlumni = await Alumni.findById(id);
    if (!existingAlumni) {
      return res.status(404).json({ message: 'Alumni not found' });
    }

    if (updateData.password && updateData.password !== 'undefined') {
      const saltRounds = parseInt(process.env.SALT_ROUNDS);
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    } else {
      updateData.password = existingAlumni.password;
    }

    if (req.file) {
      const profilePic = req.file;
      if (existingAlumni.profilePic) {
        const previousImagePath = path.join(__dirname, '../../images', existingAlumni.profilePic);
        if (fs.existsSync(previousImagePath)) {
          fs.unlinkSync(previousImagePath);
        }
      }
      updateData.profilePic = profilePic.filename;
    }

    if (updateData.alumniType && updateData.alumniType !== existingAlumni.alumniType) {
      existingAlumni.alumniType = updateData.alumniType;
      await generateId(existingAlumni);
    }

    Object.assign(existingAlumni, updateData);

    const updatedAlumni = await existingAlumni.save();

    res.status(200).json({
      message: 'Alumni updated successfully',
      data: updatedAlumni,
    });
  } catch (error) {
    console.error('Error updating alumni:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
