namespace Configurator
{
    public class BaseConfiguration
    {
        public List<ConfigParameteres> configurationParameters { get; set; }
        public List<CurrentConfigurationValues> currentConfiguration { get; set; }

        public string libraryVersion { get; set; }
        public string serializationVersion { get; set; }
        public string rejectMicroversionSkew { get; set; }
        public string microversionSkew { get; set; }
        public string sourceMicroversion { get; set; }
    }

    public class ConfigOptions
    {
        public dynamic btType { get; set; }
        public dynamic optionName { get; set; }
        public dynamic option { get; set; }
        public dynamic nodeId { get; set; }
    }
    public class ConfigParameteres
    {
        public dynamic btType { get; set; }
        public rangeAndDefaultArr rangeAndDefault { get; set; }
        public dynamic quantityType { get; set; }

        public dynamic defaultValue { get; set; }
        public dynamic enumName { get; set; }
        public List<ConfigOptions>? options { get; set; }
        public dynamic parameterName { get; set; }
        public dynamic parameterId { get; set; }
        public dynamic nodeId { get; set; }

    }

    public class CurrentConfigurationValues
    {
        public dynamic btType { get; set; }
        public dynamic nodeId { get; set; }
        public dynamic value { get; set; }
        public dynamic enumName { get; set; }
        public dynamic parameterId { get; set; }
        public string units { get; set; }
        public dynamic expression { get; set; }
    }

    public class ModuleNode
    {
        public dynamic btType { get; set; }

        public dynamic versionId { get; set; }
        public dynamic documentId { get; set; }
        public dynamic elementId { get; set; }
    }
    public class LocationArr
    {
        public dynamic btType { get; set; }
        public dynamic version { get; set; }
        public dynamic document { get; set; }
        public dynamic topLevel { get; set; }
        public dynamic languageVersion { get; set; }
        public dynamic elementMicroversion { get; set; }
        public ModuleNode moduleIds { get; set; }
        public dynamic column { get; set; }
        public dynamic endLine { get; set; }
        public dynamic endColumn { get; set; }

        public dynamic line { get; set; }
        public dynamic character { get; set; }
        public dynamic parseNodeId { get; set; }
        public dynamic nodeId { get; set; }


    }


    public class rangeAndDefaultArr
    {
        public dynamic btType { get; set; }
        public LocationArr location { get; set; }
        public dynamic defaultValue { get; set; }
        public dynamic units { get; set; }
        public dynamic maxValue { get; set; }
        public dynamic minValue { get; set; }

    }
    public class ConfigSerializer
    {
    }
}
