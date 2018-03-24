# frozen_string_literal: true

# Traits and validations specific to Terrestrial Exalted
# TODO: replace mote counts as needed to reflect numbers in the hardback once
#      that chapter is released
class DragonbloodCharacter < Character
  include AbilityExalt

  attribute :essence,                  :integer, default: 2
  attribute :motes_personal_total,     :integer, default: 13
  attribute :motes_personal_current,   :integer, default: 13
  attribute :motes_peripheral_total,   :integer, default: 31
  attribute :motes_peripheral_current, :integer, default: 31
  attribute :exalt_type,               :string,  default: 'Dragonblood'

  has_many :dragonblood_charms, foreign_key: 'character_id', inverse_of: :character, dependent: :destroy
  alias_attribute :charms, :dragonblood_charms

  DRAGONBLOOD_ASPECTS = %w[air earth fire water wood].freeze
  # TODO: caste ability validations

  before_validation :set_mote_pool_totals
  before_validation :set_exalt_type

  validates :caste, inclusion: { in: DRAGONBLOOD_ASPECTS }, unless: :caste_is_blank?
  validate :caste_abilities_are_valid,                      unless: :caste_is_blank?

  private

  def caste_is_blank?
    caste.blank?
  end

  def set_mote_pool_totals
    return unless will_save_change_to_attribute? :essence

    self.motes_personal_total     = essence + 11
    self.motes_peripheral_total   = (essence * 4) + 23
    self.motes_personal_current   = [motes_personal_available,   motes_personal_current].min
    self.motes_peripheral_current = [motes_peripheral_available, motes_peripheral_current].min
  end

  def set_exalt_type
    self.exalt_type = 'Dragonblood'
    self.aspect = true
  end

  def caste_abilities_are_valid
    true
  end
end