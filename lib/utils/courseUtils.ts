import { Course } from '../api';
import React from 'react';

export const getStatusBadge = (course: Course) => {
  if (!course.status) return null;
  
  switch(course.status) {
    case 'vol':
      return (
        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
          Vol
        </span>
      );
    case 'bijna_vol':
      return (
        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
          Bijna vol
        </span>
      );
    case 'open':
      return (
        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Beschikbaar
        </span>
      );
    default:
      return null;
  }
};

export const getAvailabilityText = (course: Course) => {
  if (course.maxParticipants && course.currentParticipants !== undefined) {
    const available = course.maxParticipants - course.currentParticipants;
    if (available <= 0) {
      return "Geen plaatsen beschikbaar";
    } else if (available <= 3) {
      return `Nog ${available} ${available === 1 ? 'plaats' : 'plaatsen'} beschikbaar`;
    } else {
      return `${available} plaatsen beschikbaar`;
    }
  }
  return "";
};