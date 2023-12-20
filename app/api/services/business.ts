import { supabaseWithServiceRoleForServer } from "@/lib/supabase.server";
import { Business, BusinessInput } from "@/types";

const supabase = supabaseWithServiceRoleForServer;

/**
 * Fetches all businesses.
 * @returns An array of Business objects.
 */
export const getAllBusinesses = async (): Promise<Business[]> => {
  const { data, error } = await supabase.from("businesses").select(`
    *,
    profile:userId ( * )
  `);

  if (error) {
    throw new Error(`Error fetching businesses: ${error.message}`);
  }
  return data || [];
};

/**
 * Fetches a business by its ID.
 * @param id - The ID of the business.
 * @returns A Business object.
 */
export const getBusinessById = async (id: string): Promise<Business> => {
  const { data, error } = await supabase
    .from("businesses")
    .select(
      `
      *,
      profile:userId ( * )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Error fetching business with ID ${id}: ${error.message}`);
  }

  return data;
};

/**
 * Deletes a business by its ID.
 * @param id - The ID of the business to delete.
 */
export const deleteBusinessById = async (id: string): Promise<void> => {
  const { error } = await supabase.from("businesses").delete().eq("id", id);

  if (error) {
    throw new Error(`Error deleting business with ID ${id}: ${error.message}`);
  }
};

/**
 * Updates a business by its ID.
 * @param id - The ID of the business to update.
 * @param updateData - The data to update.
 */
export const updateBusinessById = async (
  id: string,
  updateData: Partial<Business>
): Promise<void> => {
  if (updateData?.name && updateData?.name.length < 3)
    throw new Error("Business name must be at least 3 characters long");

  const { error } = await supabase
    .from("businesses")
    .update(updateData)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Error updating business with ID ${id}: ${error.message}`);
  }
};

/**
 * Adds a new business.
 * @param newBusinessData - The data for the new business.
 */
export const addNewBusiness = async (
  newBusinessData: BusinessInput
): Promise<void> => {
  if (newBusinessData.name.length < 3)
    throw new Error("Business name must be at least 3 characters long");

  const { error } = await supabase
    .from("businesses")
    .insert([newBusinessData])
    .single();

  if (error) {
    throw new Error(`Error adding new business: ${error.message}`);
  }
};
