import React, { useState } from 'react';

interface UserProfileFormProps {
  // Optionally accept props for editing
}

const initialState = {
  name: '',
  location: '',
  profilePhoto: null as File | null,
  skillsOffered: [] as string[],
  skillsWanted: [] as string[],
  availability: '',
  profile: 'public',
  email: '',
  password: '',
};

const UserProfileForm: React.FC<UserProfileFormProps> = () => {
  const [form, setForm] = useState(initialState);
  const [skillOfferedInput, setSkillOfferedInput] = useState('');
  const [skillWantedInput, setSkillWantedInput] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.location) newErrors.location = 'Location is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.password) newErrors.password = 'Password is required';
    if (!form.availability) newErrors.availability = 'Availability is required';
    if (form.skillsOffered.length === 0) newErrors.skillsOffered = 'At least one skill offered';
    if (form.skillsWanted.length === 0) newErrors.skillsWanted = 'At least one skill wanted';
    return newErrors;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as any;
    if (type === 'file') {
      setForm((prev) => ({ ...prev, profilePhoto: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle tag add/remove
  const handleAddSkill = (type: 'offered' | 'wanted') => {
    if (type === 'offered' && skillOfferedInput.trim()) {
      setForm((prev) => ({ ...prev, skillsOffered: [...prev.skillsOffered, skillOfferedInput.trim()] }));
      setSkillOfferedInput('');
    }
    if (type === 'wanted' && skillWantedInput.trim()) {
      setForm((prev) => ({ ...prev, skillsWanted: [...prev.skillsWanted, skillWantedInput.trim()] }));
      setSkillWantedInput('');
    }
  };
  const handleRemoveSkill = (type: 'offered' | 'wanted', idx: number) => {
    if (type === 'offered') {
      setForm((prev) => ({ ...prev, skillsOffered: prev.skillsOffered.filter((_, i) => i !== idx) }));
    } else {
      setForm((prev) => ({ ...prev, skillsWanted: prev.skillsWanted.filter((_, i) => i !== idx) }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('location', form.location);
      formData.append('email', form.email);
      formData.append('password', form.password);
      formData.append('availability', form.availability);
      formData.append('profile', form.profile);
      form.skillsOffered.forEach((skill, i) => formData.append(`skillsOffered[${i}]`, skill));
      form.skillsWanted.forEach((skill, i) => formData.append(`skillsWanted[${i}]`, skill));
      if (form.profilePhoto) formData.append('profilePhoto', form.profilePhoto);

      const res = await fetch('/api/users', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSuccess('Profile saved successfully!');
      setForm(initialState);
    } catch (err: any) {
      setErrors({ submit: err.message || 'Submission failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-2xl mx-auto p-6 bg-white rounded shadow" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {success && <div className="mb-2 text-green-600">{success}</div>}
      {errors.submit && <div className="mb-2 text-red-600">{errors.submit}</div>}
      <div className="mb-4">
        <label className="block font-semibold">Name</label>
        <input name="name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" />
        {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Location</label>
        <input name="location" value={form.location} onChange={handleChange} className="w-full border p-2 rounded" />
        {errors.location && <div className="text-red-600 text-sm">{errors.location}</div>}
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Profile Photo</label>
        <input name="profilePhoto" type="file" accept="image/*" onChange={handleChange} className="w-full" />
      </div>
      <div className="mb-4 flex gap-4">
        <div className="w-1/2">
          <label className="block font-semibold">Skills Offered</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {form.skillsOffered.map((skill, idx) => (
              <span key={idx} className="bg-blue-200 px-2 py-1 rounded-full flex items-center">
                {skill}
                <button type="button" className="ml-1 text-red-600" onClick={() => handleRemoveSkill('offered', idx)}>&times;</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={skillOfferedInput} onChange={e => setSkillOfferedInput(e.target.value)} className="border p-2 rounded w-full" placeholder="Add skill" />
            <button type="button" onClick={() => handleAddSkill('offered')} className="bg-blue-500 text-white px-3 py-1 rounded">Add</button>
          </div>
          {errors.skillsOffered && <div className="text-red-600 text-sm">{errors.skillsOffered}</div>}
        </div>
        <div className="w-1/2">
          <label className="block font-semibold">Skills Wanted</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {form.skillsWanted.map((skill, idx) => (
              <span key={idx} className="bg-green-200 px-2 py-1 rounded-full flex items-center">
                {skill}
                <button type="button" className="ml-1 text-red-600" onClick={() => handleRemoveSkill('wanted', idx)}>&times;</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={skillWantedInput} onChange={e => setSkillWantedInput(e.target.value)} className="border p-2 rounded w-full" placeholder="Add skill" />
            <button type="button" onClick={() => handleAddSkill('wanted')} className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
          </div>
          {errors.skillsWanted && <div className="text-red-600 text-sm">{errors.skillsWanted}</div>}
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Availability</label>
        <input name="availability" value={form.availability} onChange={handleChange} className="w-full border p-2 rounded" placeholder="e.g. weekends" />
        {errors.availability && <div className="text-red-600 text-sm">{errors.availability}</div>}
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Profile</label>
        <select name="profile" value={form.profile} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Email</label>
        <input name="email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" type="email" />
        {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Password</label>
        <input name="password" value={form.password} onChange={handleChange} className="w-full border p-2 rounded" type="password" />
        {errors.password && <div className="text-red-600 text-sm">{errors.password}</div>}
      </div>
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded" disabled={loading}>{loading ? 'Saving...' : 'Save Profile'}</button>
    </form>
  );
};

export default UserProfileForm; 